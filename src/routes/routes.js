export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  CUSTOMERS: "/customers",
  VENDORS: "/vendors",
  TRANSACTIONS: "/transactions",
  SOLD_PERMISSION: "/sold-permission",
  ADDITION_PERMISSION: "/addition-permission",
  SOLD_INVOICES: "/sold-invoices",
  ADDITION_INVOICES: "/addition-invoices",
  PRODUCT_INVOICES: ":productId",
};

export const PATH_TO_HEADING = {
  [ROUTES.HOME]: "الصفحة الرئيسية",
  [ROUTES.PRODUCTS]: "ارصدة المخزن",
  [ROUTES.CUSTOMERS]: "العملاء",
  [ROUTES.VENDORS]: "الموردين",
  [ROUTES.TRANSACTIONS]: "حركة الاصناف",
  [ROUTES.SOLD_PERMISSION]: "إذن بيع",
  [ROUTES.ADDITION_PERMISSION]: "إذن اضافة",
  [ROUTES.SOLD_INVOICES]: "فواتير البيع",
  [ROUTES.ADDITION_INVOICES]: "فواتير الإضافة",
  [ROUTES.PRODUCT_INVOICES]: "حركة الصنف",
};
