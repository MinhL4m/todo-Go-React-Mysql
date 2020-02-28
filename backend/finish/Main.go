package main

import (
	"fmt"
	// "encoding/json"
	// "log"
	// "net/http"
	"github.com/gorilla/mux"
	// "strconv"
)

func main(){
	fmt.Println("ok")
}

// // Todo Struct
// type Todo struct {
// 	ID			string	`json: "id"`
// 	Title		string	`json: "title"`
// 	Description	string	`json: "description"`
// 	Done		bool	`json: "done"`
// 	Date		string	`json: "date"`
// }

// // Mock data
// var todos []Todo
// var taskDone []int

// // Function return list of todo as json
// func getTodos(w http.ResponseWriter, r *http.Request){
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(todos)
// }

// // Function return summary of 12 month as json
// func getSummary(w http.ResponseWriter, r *http.Request){
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(taskDone)
// }

// // Function delete todo that has id match id pass from url param
// func deleteTodo(w http.ResponseWriter, r *http.Request){
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	for index, item := range todos {
// 		if item.ID == params["id"]{
// 			//todos[:index] get from 0 to index (exclude index)
// 			//todos[index+1:] get from index + 1 to the end
// 			todos = append(todos[:index], todos[index+1:]...) // ... is spread oparation
// 			break
// 		}
// 	}
// 	json.NewEncoder(w).Encode(todos)
// }

// // Function toggle todo that has id match id pass from url param
// func toggleTodo(w http.ResponseWriter, r *http.Request){
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	for index, item := range todos {
// 		if item.ID == params["id"] {
// 			//check and toogle done
// 			//since this is slice, can change directly the field
// 			if todos[index].Done {
// 				todos[index].Done = false
// 			}else{
// 				todos[index].Done = true
// 			}
// 			json.NewEncoder(w).Encode(true)
// 			return
// 		}
// 	}
// 	json.NewEncoder(w).Encode(false)
// }

// // Function create new todo and append into the list
// func createTodos(w http.ResponseWriter, r *http.Request){
// 	w.Header().Set("Content-Type","application/json")
// 	var todo Todo
// 	len := len(todos) - 1
// 	_ = json.NewDecoder(r.Body).Decode(&todo)
// 	ID, _  := strconv.Atoi(todos[len].ID)
// 	todo.ID = strconv.Itoa(ID + 1)
// 	todos = append(todos, todo)
// 	json.NewEncoder(w).Encode(true)
// }

// func main(){
// 	// Init Router 
// 	router := mux.NewRouter()

// 	// Mock Data
// 	todos = append(todos, Todo{ID: "1", Title: "Move", Description: "move a to b", Done: false, Date: "12-02-2020"})
// 	todos = append(todos, Todo{ID: "2", Title: "Paste", Description: "paste a to b", Done: false, Date: "12-03-2020"})
// 	todos = append(todos, Todo{ID: "3", Title: "Cut", Description: "cut a to b", Done: true, Date: "12-09-2020"})
// 	todos = append(todos, Todo{ID: "4", Title: "Delete", Description: "delete a to b", Done: false, Date: "12-10-2020"})

// 	taskDone = []int{4,7,5,9,3,4,3,4,5,2,4,5}

// 	// Route and Handler
// 	router.HandleFunc("/api/todos", getTodos).Methods("GET")
// 	router.HandleFunc("/api/summary", getSummary).Methods("GET")
// 	router.HandleFunc("/api/todos/{id}", deleteTodo).Methods("DELETE")
// 	router.HandleFunc("/api/todos/{id}", toggleTodo).Methods("PUT")
// 	router.HandleFunc("/api/todos", createTodos).Methods("POST")

// 	// Set listen to Port 8000
// 	log.Fatal(http.ListenAndServe(":8000", router))
// }
