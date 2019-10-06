package marketplace

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/bytexro/hackaton2019-wubbadubdub/backend/users"
	"github.com/unrolled/render"
)

var ProductNotFoundErr = fmt.Errorf("Product not found error")

type Product struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	Credits     float64 `json:"coins"`
}

type IProductRepo interface {
	GetProducts() ([]Product, error)
	AddProduct(Product) (Product, error)
}

type InMemoryProductRepo struct {
	sync.Mutex
	products []Product
}

func NewInMemoryProductRepo() *InMemoryProductRepo {
	return &InMemoryProductRepo{
		products: []Product{
			{
				"1", "Parking spot", "location palas", "", 500,
			},
			{
				"2", "Coffee for 1 month", "Free coffee", "", 50,
			},
		},
	}
}

func (r *InMemoryProductRepo) GetProducts() ([]Product, error) {
	r.Lock()
	defer r.Unlock()
	return r.products, nil
}

func (r *InMemoryProductRepo) AddProduct(product Product) (Product, error) {
	r.Lock()
	defer r.Unlock()

	product.ID = string(len(r.products) + 1)
	r.products = append(r.products, product)

	return product, nil
}

type ProductService struct {
	repo      IProductRepo
	formatter *render.Render
}

func NewProductService(r IProductRepo, formatter *render.Render) *ProductService {
	return &ProductService{
		r, formatter,
	}
}

func (s *ProductService) ProductsHandlePost() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var product Product
		err := decoder.Decode(&product)
		user := req.Context().Value("user").(users.User)
		fmt.Printf("User: %v", user)
		if err != nil {
			s.formatter.JSON(w, http.StatusBadRequest, "Failed to parse product")
			return
		}

		product, err = s.repo.AddProduct(product)
		if err != nil {
			s.formatter.JSON(w, http.StatusInternalServerError, "Failed to save event")
			return
		}
		s.formatter.JSON(w, http.StatusOK, product)
	}
}

func (s *ProductService) ProductsHandleGet() http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		products, err := s.repo.GetProducts()
		if err != nil {
			s.formatter.JSON(w, http.StatusInternalServerError, "Failed to get products")
			return
		}
		s.formatter.JSON(w, http.StatusOK, products)
	}
}
