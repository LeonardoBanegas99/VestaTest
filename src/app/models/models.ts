export interface Sale {
  codigo_venta: string,
  fecha_venta: string,
  ciudad: string,
  tipo_venta: string,
  producto: string,
  origen_producto: string,
  lote_producto: string,
  orden_compra: string,
  responsable_venta: string,
  valor_compra: number,
  precio_venta: number,
}
export interface product {
  Producto: string,
  Valor: number | any
}
