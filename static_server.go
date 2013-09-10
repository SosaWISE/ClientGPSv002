package main

import (
	"log"
	"mime"
	"net/http"
)

func main() {
	// set correct mime type for javascript files
	mime.AddExtensionType(".js", "application/javascript")

	http.Handle("/", http.StripPrefix("/", &serverWrapper{http.FileServer(http.Dir("./"))}))
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

type serverWrapper struct {
	handler http.Handler
}

func (s *serverWrapper) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	upath := r.URL.Path
	log.Printf("path: %s\n", upath)
	s.handler.ServeHTTP(w, r)
}
