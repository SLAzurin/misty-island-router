package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/ilyakaznacheev/cleanenv"
	_ "github.com/lib/pq"
)

type MistyStats struct {
	// To decide later if I want to track anything else other than unique page loads
}

type conf struct {
	PostgresUser                 string `env:"POSTGRES_USER"`
	PostgresPassword             string `env:"POSTGRES_PASSWORD"`
	PostgresDB                   string `env:"POSTGRES_DB"`
	ClientPostgresHost           string `env:"CLIENT_POSTGRES_HOST"`
	ClientPostgresPort           string `env:"CLIENT_POSTGRES_PORT"`
	ClientPostgresSSLMode        string `env:"CLIENT_POSTGRES_SSLMODE"`
	ProdPostgresConnectionString string `env:"PROD_MISTY_POSTGRES"`
}

var config = conf{}
var db *sql.DB

func initDB() {
	var err error
	sslmode := "disable"
	if config.ClientPostgresSSLMode != "" {
		sslmode = "require"
	}

	var connStr = config.ProdPostgresConnectionString
	if connStr == "" {
		connStr = "postgresql://" + config.PostgresUser + ":" + url.QueryEscape(config.PostgresPassword) + "@" + config.ClientPostgresHost + ":" + config.ClientPostgresPort + "/" + config.PostgresDB + "?sslmode=" + sslmode
	}
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
}

var allowList = map[string]bool{
	"https://slazurin.github.io": true,
	"http://localhost:3000":      true,
}

func main() {
	cleanenv.ReadEnv(&config)
	cleanenv.ReadConfig("psql.env", &config)
	cleanenv.ReadConfig(".env", &config)
	initDB()
	ingest := make(chan string)
	go func() {
		for v := range ingest {
			func() {
				defer func() {
					if r := recover(); r != nil {
						fmt.Println("Recovered in ingest", r)
					}
				}()
				stmt, _ := db.Prepare("INSERT into visits (id) values ($1)")
				stmt.Exec(v)
			}()
		}
	}()

	r := gin.Default()
	statisticsGroup := r.Group("/misty/statistics")
	{
		statisticsGroup.GET("/add", func(c *gin.Context) {
			if origin := c.Request.Header.Get("Origin"); allowList[origin] {
				c.Header("Access-Control-Allow-Origin", origin)
			} else {
				c.AbortWithStatus(http.StatusMethodNotAllowed)
				return
			}
			id := uuid.New()
			c.AbortWithStatusJSON(http.StatusOK, gin.H{
				"token": id.String(),
			})
		})
		statisticsGroup.POST("/add", func(c *gin.Context) {
			if origin := c.Request.Header.Get("Origin"); allowList[origin] {
				c.Header("Access-Control-Allow-Origin", origin)
			} else {
				c.AbortWithStatus(http.StatusMethodNotAllowed)
				return
			}
			auth := c.Request.Header.Get("Authorization")
			if strings.HasPrefix(auth, "Bearer ") {
				auth = auth[7:]
			} else {
				c.AbortWithStatus(http.StatusUnauthorized)
				return
			}
			ingest <- uuid.MustParse(auth).String()
			c.Status(http.StatusNoContent)
		})
		statisticsGroup.OPTIONS("/add", func(c *gin.Context) {
			if origin := c.Request.Header.Get("Origin"); allowList[origin] {
				c.Header("Access-Control-Allow-Origin", origin)
			} else {
				c.AbortWithStatus(http.StatusMethodNotAllowed)
				return
			}
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Authorization, *")
			c.Header("Access-Control-Max-Age", "86400")
			c.Status(http.StatusNoContent)
		})
	}
	port := "8080"
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	}
	r.Run("0.0.0.0:" + port)
}
