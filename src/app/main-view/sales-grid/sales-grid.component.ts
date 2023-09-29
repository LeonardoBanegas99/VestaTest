import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Sale, product } from '../../models/models';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-sales-grid',
  templateUrl: './sales-grid.component.html',
  styleUrls: ['./sales-grid.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SalesGridComponent implements AfterViewInit, OnInit {
  sales: Sale[] = [];

  columns = [
    { text: 'Codigo', datafield: 'codigo_venta', width: 60 },
    { text: 'Tipo', datafield: 'tipo_venta', width: 80 },
    { text: 'Ciudad', datafield: 'ciudad', width: 120 },
    { text: 'Responsable', datafield: 'responsable_venta', width: 100 },
    { text: 'Valor Compra', datafield: 'valor_compra', width: 100 },
    { text: 'Precio Venta', datafield: 'precio_venta', width: 100 },
    { text: 'fecha_venta', datafield: 'fecha_venta', width: 100 },
    { text: 'producto', datafield: 'producto', width: 100 },
    { text: 'origen_producto', datafield: 'origen_producto', width: 100 },
    { text: 'lote_producto', datafield: 'lote_producto', width: 100 },
    { text: 'orden_compra', datafield: 'orden_compra', width: 100 },
  ];
  cities : string[] = [];
  productsData : string[] = [];
  productsCounter: product[] = [];
  selected: string = '';
  sourceGridData: any;
  //{ text: '', datafield: '', width: 100 },
  //source = new jqx.dataAdapter({ localData: this.sales });

  xAxis: any =
    {
      dataField: 'Producto',
      gridLines: { visible: true },
      valuesOnTicks: true
    };

  seriesGroups = [{
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
  constructor() {
    console.log(this.sales.length, 'length of sales', this.productsCounter);
  }

  ngAfterViewInit(): void {

  }


  ngOnInit(): void {

  }

  getSelected() {
    if (this.selected == null) {
      this.sourceGridData = new jqx.dataAdapter({ localData: this.sales });
      return;
    };
    const filteredSales = this.sales.filter((sale) => sale.ciudad === this.selected);
    this.sourceGridData = new jqx.dataAdapter({ localData: filteredSales });
  }

  setCities() {
    this.cities = [...new Set(this.sales.map(sale => sale.ciudad))];
  };

  setProducts() {
    this.productsData = this.sales.map(sale => sale.producto);
    let counter = this.productsData.reduce((count: any, currentValue: string) => {
      return (count[currentValue] ? ++count[currentValue] : (count[currentValue] = 1), count);
    }, {});
    counter = this.getMostSoldProducts(counter);
    this.productsCounter = Object.entries(counter).map(([product, count]) => ({ Producto: product, Valor: count }))
  }

  getMostSoldProducts(products : object) {
    const maxN = 5;

    let sortedProducts = Object.entries(products).sort((a, b) => {
      return b[1] - a[1];
    });
    let last = sortedProducts[maxN - 1][1];
    let entries = sortedProducts.filter((entry) => { return entry[1] >= last; });
    let mostSoldProducts = Object.fromEntries(entries);
    return mostSoldProducts;
  };

  readExcel($event: any) {
    console.log('excel');
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows : Sale[] = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.sales = rows;
          this.sourceGridData = new jqx.dataAdapter({ localData: this.sales });
          this.setCities();
          this.setProducts();
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

}
