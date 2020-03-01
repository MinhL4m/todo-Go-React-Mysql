package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/rs/cors"
	"strconv"
)

type Todo struct {
	Id          int    `gorm:"unique_index;column:id" json: "id"`
	Title       string `gorm:"not null;column:title" json: "title"`
	Description string `gorm:"not null;colum:description" json: "description"`
	Done        bool   `gorm:"column:done" json: "done"`
}

type Summary struct {
	Undone int
	Done   int
}

const (
	databaseType = "mysql"
	database     = "root:password@tcp(localhost:3306)/todo"
)

func getTodos(w http.ResponseWriter, r *http.Request) {

	db, err := gorm.Open(databaseType, database)
	if err != nil {
		fmt.Println(err.Error())
		panic("fail to connect")
	}

	defer db.Close()

	var todo []Todo

	db.Find(&todo)
	json.NewEncoder(w).Encode(todo)
}

func createTodos(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open(databaseType, database)
	if err != nil {
		fmt.Println(err.Error())
		panic("fail to connect")
	}

	defer db.Close()
	var todo Todo
	_ = json.NewDecoder(r.Body).Decode(&todo)

	db.Create(&todo)

	json.NewEncoder(w).Encode(todo)
}

func toggleTodo(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open(databaseType, database)
	if err != nil {
		fmt.Println(err.Error())
		panic("fail to connect")
	}

	defer db.Close()

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var todo Todo
	db.First(&todo, params["id"])

	todo.Done = !todo.Done

	db.Save(&todo)
	json.NewEncoder(w).Encode(todo)
}

func deleteTodo(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open(databaseType, database)
	if err != nil {
		fmt.Println(err.Error())
		panic("fail to connect")
	}

	defer db.Close()

	w.Header().Set("Content-Type","application/json")
	
	var todo Todo
	var params = mux.Vars(r)
	todo.Id,_ = strconv.Atoi(params["id"])
	db.Delete(todo)
	json.NewEncoder(w).Encode(todo)
}

func getSummary(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open(databaseType, database)
	if err != nil {
		fmt.Println(err.Error())
		panic("fail to connect")
	}

	defer db.Close()

	var undone int
	var done int

	db.Model(&Todo{}).Where("done = ?", 0).Count(&undone)
	db.Model(&Todo{}).Where("done = ?", 1).Count(&done)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Summary{undone, done})
}

func main() {

	//Init Router
	router := mux.NewRouter()

	//Add Handler for each path
	router.HandleFunc("/api/todos", getTodos).Methods("GET")
	router.HandleFunc("/api/todos", createTodos).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/todos/{id}", toggleTodo).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/todos/{id}", deleteTodo).Methods("DELETE")
	router.HandleFunc("/api/summary", getSummary).Methods("GET")

	

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowCredentials: true,
		Debug: true,
		AllowedMethods: []string{"POST","PUT","GET","DELETE"},
	})

	handler := cors.Default().Handler(router)
	handler = c.Handler(handler)
	// listen to port 8080 and router take care of request
	log.Fatal(http.ListenAndServe(":8080", handler))
}
