import { FormEvent, useState } from 'react'
import { FetchProductsResponse, Product } from '@/interface/interfaces'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { toast } from 'react-toastify'


export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const [searchText, setSearchText] = useState('')
  const [showNotFound, setShowNotFound] = useState(false)
  const [store, setStore] = useState('')
  const [description, setDescription] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  
  async function fetchProducts(url: string){
    const response = await fetch(url)
    const data: FetchProductsResponse = await response.json()
    return data;
  }

  async function searchProducts(event: FormEvent){
    event.preventDefault();

    const goatUrl =  "https://ac.cnstrc.com/autocomplete/" + searchText + 
      "?c=ciojs-client-2.35.2" + 
      "&key=key_XT7bjdbvjgECO5d8&i=30136705-ea02-4e7e-b444-629859769d8e" + 
      "&s=24" + 
      "&num_results_Products=25" + 
      "&num_results_Collections=20" + 
      "&_dt=1685182403005"
    
    try {
      const data = await fetchProducts(goatUrl)
      const { Products: products } = data.sections
      
      setProducts(products)
      setShowNotFound(products.length === 0)
    } catch (error) {
    }
  }
  
  async function fireWebhook(e: FormEvent){
    e.preventDefault()

    const payload = { 
      value: selectedProduct!.value,
      sku: selectedProduct!.data.sku,
      image_url: selectedProduct!.data.image_url,
      store,
      releaseDate,
      checked: checked.toString(),
      description
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/webhooks`, {
      method: "POST", 
      headers: { "content-type": "application/json" }, 
      body: JSON.stringify(payload)
    })

    const data = await response.json()
    console.log(data)
    setProducts([])
    setSelectedProduct(undefined)

    toast.success('Leak Registrado!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  function cancelWebhookFiring(){
    setSelectedProduct(undefined)
  }

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <i id="logo" className="fa-sharp fa-solid fa-user-secret" style={!!selectedProduct ? {fontSize: '5rem'} : {fontSize: '7rem'}}></i>
          <h1 style={!!selectedProduct ? {display: 'none'} : {display: 'flex'}}>LEAK SNEAKERS</h1>
          <form className="search-form" onSubmit={searchProducts} style={!!selectedProduct ? {display: 'none'} : {display: 'flex'}}>
            <div className="input-container">
              <label htmlFor="search">SKU</label>
              <input value={searchText}
                onChange={e => setSearchText(e.target.value)}
                type="search" 
                name="search" 
                id="searchInput" 
                required />
            </div>
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        <div className='result-container'  style={showNotFound ? {display: 'flex'} : {display: 'none'}}>
          <span>Nenhum resultado encontrado!</span>
          <i className='fa-regular fa-face-dizzy'/>
        </div>

        <div className="products-list">
          {
            !!selectedProduct ?
            <ProductCard product={selectedProduct} 
                  onClick={() => setSelectedProduct(selectedProduct)} /> : 
            products.map(product => 
              <ProductCard key={product.data.id}
                product={product} 
                onClick={() => setSelectedProduct(product)} />
            )
          }
        </div>
      
        <form className="webhook-form" onSubmit={fireWebhook} style={!!selectedProduct ? {display: 'flex'} : {display: 'none'}}>
          <h2>Cadastrar Info</h2>
          <div className="leakInput">
            <div className="copping">
              <label htmlFor="copping-input">Copping</label>
              <input id="copping-input" type="checkbox" checked={checked} onChange={handleChange}/>
            </div>
            <div className="store">
              <label htmlFor="store-input">Loja</label>
              <input value={store}
                onChange={e => setStore(e.target.value)}
                id="store-input" 
                type="text" />
            </div>
            <div className="date">
              <label htmlFor="release-date-input">Data de Lançamento</label>
              <input value={releaseDate}
                onChange={e => setReleaseDate(e.target.value)}
                type="text" 
                name="release-date-input" 
                id="release-date-input" />
            </div>
            <div className="description" style={!!checked ? {display: 'flex'} : {display: 'none'}}>
              <label htmlFor="description-input">Descrição</label>
              <textarea value={description}
                onChange={e => setDescription(e.target.value)}
                id="description-input" 
                 />
            </div>
            <div className="buttons">
              <button className="webform-btn" type="submit">Registrar</button>
              <button className="webform-btn" type="button" onClick={cancelWebhookFiring}>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
      <div className="toast"></div>
    </>
  )
}
