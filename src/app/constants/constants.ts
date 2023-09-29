const columns = [
  { text: 'Codigo', datafield: 'codigo_venta', width: 60 },
  { text: 'Tipo', datafield: 'tipo_venta', width: 80 },
  { text: 'Ciudad', datafield: 'ciudad', width: 120 },
  { text: 'Responsable', datafield: 'responsable_venta', width: 100 },
  { text: 'Valor Compra', datafield: 'valor_compra', width: 100 },
  { text: 'Precio Venta', datafield: 'precio_venta', width: 100, aggregates: ['sum'],
  aggregatesrenderer: (aggregates : any) => {
      if (aggregates.sum == undefined) {
          return 'Total: 0';
      } else {
          let renderstring = 'Total: ' + aggregates.sum;
          return renderstring;
      }
  } },
  { text: 'Fecha Venta', datafield: 'fecha_venta', width: 100 },
  { text: 'Producto', datafield: 'producto', width: 100 },
  { text: 'Origen Producto', datafield: 'origen_producto', width: 120 },
  { text: 'Lote Producto', datafield: 'lote_producto', width: 100 },
  { text: 'Orden Compra', datafield: 'orden_compra', width: 110 },
];

const xAxis: any = {
  dataField: 'Producto',
  gridLines: { visible: true },
  valuesOnTicks: true
};

const seriesGroups = [{
  type: "column",
  orientation: "vertical",
  series: [{
    dataField: "Valor",
    displayText: "Cantidad de Ventas"
  }],
  valueAxis: {
    minValue: 0,
    maxValue: 15,
    unitInterval: 1,
    description: 'Cantidad'
  },
}];

export default {columns, xAxis, seriesGroups};