export interface FetchProductsResponse {
  sections: Sections
  result_id: string
  request: Request
}

export interface Sections {
  Brands: any[]
  "Search Suggestions": any[]
  Collections: any[]
  Products: Product[]
}

export interface Product {
  matched_terms: string[]
  data: Data
  value: string
  is_slotted: boolean
  labels: Labels
}

export interface Data {
  id: string
  sku: string
  slug: string
  color: string
  category: string
  release_date?: number
  product_type: string
  release_date_year?: number
  retail_price_cents: number
  retail_price_cents_myr?: number
  retail_price_cents_sgd?: number
  retail_price_cents_krw?: number
  retail_price_cents_jpy?: number
  retail_price_cents_hkd?: number
  retail_price_cents_cny?: number
  retail_price_cents_aud?: number
  retail_price_cents_cad?: number
  retail_price_cents_eur?: number
  retail_price_cents_gbp?: number
  retail_price_cents_twd?: number
  discount_tag?: string
  variation_id: string
  box_condition: string
  product_condition: string
  lowest_price_cents: number
  lowest_price_cents_gbp: number
  lowest_price_cents_cad: number
  lowest_price_cents_myr: number
  lowest_price_cents_hkd: number
  lowest_price_cents_eur: number
  lowest_price_cents_aud: number
  lowest_price_cents_sgd: number
  lowest_price_cents_twd: number
  lowest_price_cents_jpy: number
  lowest_price_cents_cny: number
  lowest_price_cents_krw: number
  count_for_product_condition: number
  image_url?: string
  instant_ship_lowest_price_cents?: number
  instant_ship_lowest_price_cents_eur?: number
  instant_ship_lowest_price_cents_krw?: number
  instant_ship_lowest_price_cents_aud?: number
  instant_ship_lowest_price_cents_gbp?: number
  instant_ship_lowest_price_cents_sgd?: number
  instant_ship_lowest_price_cents_cad?: number
  instant_ship_lowest_price_cents_cny?: number
  instant_ship_lowest_price_cents_hkd?: number
  instant_ship_lowest_price_cents_twd?: number
  instant_ship_lowest_price_cents_jpy?: number
  instant_ship_lowest_price_cents_myr?: number
  season?: string
}

export interface Labels {}

export interface Request {
  num_results_Products: number
  num_results_Collections: number
  term: string
  features: Features
  feature_variants: FeatureVariants
  searchandized_items: SearchandizedItems
}

export interface Features {
  query_items: boolean
  a_a_test: boolean
  auto_generated_refined_query_rules: boolean
  manual_searchandizing: boolean
  personalization: boolean
  filter_items: boolean
  use_reranker_service_for_search: boolean
  use_reranker_service_for_browse: boolean
  use_reranker_service_for_all: boolean
  custom_autosuggest_ui: boolean
}

export interface FeatureVariants {
  query_items: string
  a_a_test: any
  auto_generated_refined_query_rules: string
  manual_searchandizing: any
  personalization: string
  filter_items: string
  use_reranker_service_for_search: any
  use_reranker_service_for_browse: any
  use_reranker_service_for_all: any
  custom_autosuggest_ui: any
}

export interface SearchandizedItems {}

