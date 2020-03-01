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
)

type Todo struct {
	Id          int    `gorm:"AUTO_INCREMENT;unique_index;column:id;default:0" json: "id"`
	Title       string `gorm:"not null;column:title" json: "title"`
	Description string `gorm:"not null;colum:description" json: "description"`
	Done        bool   `gorm:"column:done" json: "done"`
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
	fmt.Println(r.Body)
	var todo Todo
	_ = json.NewDecoder(r.Body).Decode(&todo)
	fmt.Println(todo.Description)
	db.Create(&todo)

	json.NewEncoder(w).Encode(todo)
}

func toggleTodo(w http.ResponseWriter, r *http.Request) {

}

func deleteTodo(w http.ResponseWriter, r *http.Request) {

}

func getSummary(w http.ResponseWriter, r *http.Request) {

}

func main() {

	//Init Router
	router := mux.NewRouter()

	//Add Handler for each path
	router.HandleFunc("/api/todos", getTodos).Methods("GET")
	router.HandleFunc("/api/todos", createTodos).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/todos/{id}", toggleTodo).Methods("PUT")
	router.HandleFunc("/api/todos", deleteTodo).Methods("DELETE")
	router.HandleFunc("api/summary", getSummary).Methods("GET")

	handler := cors.Default().Handler(router)

	// listen to port 8080 and router take care of request
	log.Fatal(http.ListenAndServe(":8080", handler))
}
