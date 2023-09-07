package router

import (
	"context"
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"

	"fancypenosi/router/ajax"
	"fancypenosi/router/page"
	"fancypenosi/router/partial"
	"fancypenosi/web"
	env "washambi-env"
)

// todo: refresh cookie
// todo: context https://stackoverflow.com/a/40380147
func auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c, e := r.Cookie("id")
		var ctx context.Context
		if e != nil || c.Value == "" {
			// todo: fetch user
			ctx = context.WithValue(r.Context(), "authorized", false)
		} else {
			ctx = context.WithValue(r.Context(), "authorized", true)
			ctx = context.WithValue(ctx, "user_id", c.Value)
		}

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func redirect(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if v := r.Context().Value("authorized"); v != true {
			// todo: client redirect
			http.SetCookie(w, &http.Cookie{
				Name:     "redirect",
				Value:    r.URL.String(),
				Secure:   true,
				HttpOnly: false,
				SameSite: http.SameSiteStrictMode,
			})
			http.Redirect(w, r, "/sign-in", http.StatusSeeOther)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var originHeader = r.Header["Origin"]
		if len(originHeader) > 0 {
			var origin string
			switch originHeader[0] { // todo: if len > 1?
			case env.ElonbustUrl:
				origin = env.ElonbustUrl
			}
			if origin != "" {
				w.Header().Add("Access-Control-Allow-Origin", origin)
			}
		}
		next.ServeHTTP(w, r)
	})
}

func Serve() error {
	m := chi.NewMux()

	m.Get("/", page.Home)
	m.Get("/account", page.Account)
	m.Get("/sign-up", page.Registrar(page.SignUp))
	m.Get("/sign-in", page.Registrar(page.SignIn))

	m.Post("/sign-in", ajax.SignIn)
	m.Post("/sign-up", ajax.SignUp)
	m.Post("/sign-out", ajax.SignOut)
	m.Post("/fetch-user", ajax.FetchUser)
	m.Post("/reset-password", ajax.ResetPassword)

	m.With(cors, auth).Get("/partial/navigator", partial.Navigator)
	m.With(auth, redirect).Get("/account", page.Account)

	sub, e := fs.Sub(web.Embeds, "public")
	if e != nil {
		return e
	}
	m.With(cors).Handle("/public/*", http.StripPrefix("/public/", http.FileServer(http.FS(sub))))

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.FancypenosiPort),
		Handler: m,
	}

	return s.ListenAndServe()
}

// authorized
// m.Route("/", func(r chi.Router) {
//  r.Use(Auth)
// 	r.Get("/account", page.Account)
// })
