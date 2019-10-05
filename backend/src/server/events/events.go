package events

import (
	"net/http"

	"github.com/unrolled/render"
)

func ListEventsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, []string{"asd"})
	}
}
