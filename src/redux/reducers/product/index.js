import {
  PRODUCT_CATEGORIES,
  PRODUCTS,
  ADD_PRODUCT_COLLECTION,
  PRODUCT_COLLECTTIONS,
  PRODUCT_COLLECTTION_PAGINATION,
  SHOW_PRODUCT,
} from '../../action';
const initialState = {
  productCategoriesLoading: false,
  productCategoriesResult: false,
  productCategoriesError: false,

  productsLoading: false,
  productsResult: false,
  productsError: false,

  showProductLoading: false,
  showProductResult: false,
  showProductError: false,

  productCollectionsLoading: false,
  productCollectionsResult: false,
  productCollectionsError: false,

  productCollectionPaginationLoading: false,
  productCollectionPaginationResult: false,
  productCollectionPaginationError: false,
  productCollectionPaginationMoreLoading: false,
  productCollectionPaginationResultPagination: [],

  addProductCollectionLoading: false,
  addProductCollectionResult: false,
  addProductCollectionError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRODUCT_CATEGORIES:
      return {
        ...state,
        productCategoriesLoading: action.payload.loading,
        productCategoriesResult: action.payload.data,
        productCategoriesError: action.payload.errorMessage,
      };
    case PRODUCTS:
      return {
        ...state,
        productsLoading: action.payload.loading,
        productsResult: action.payload.data,
        productsError: action.payload.errorMessage,
      };
    case SHOW_PRODUCT:
      return {
        ...state,
        showProductLoading: action.payload.loading,
        showProductResult: action.payload.data,
        showProductError: action.payload.errorMessage,
      };
    case PRODUCT_COLLECTTIONS:
      return {
        ...state,
        productCollectionsLoading: action.payload.loading,
        productCollectionsResult: action.payload.data,
        productCollectionsError: action.payload.errorMessage,
      };
    case PRODUCT_COLLECTTION_PAGINATION:
      return {
        ...state,
        productCollectionPaginationLoading: action.payload.loading,
        productCollectionPaginationMoreLoading: action.payload.moreLoading,
        productCollectionPaginationResult: action.payload.data,
        productCollectionPaginationResultPagination: action.payload.refresh
          ? action.payload.dataPagination
          : [
              ...state.productCollectionPaginationResultPagination,
              ...action.payload.dataPagination,
            ],
        productCollectionPaginationError: action.payload.errorMessage,
      };
    case ADD_PRODUCT_COLLECTION:
      return {
        ...state,
        addProductCollectionLoading: action.payload.loading,
        addProductCollectionResult: action.payload.data,
        addProductCollectionError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
