import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Sale, product } from '../../models/models';
import { read, utils } from 'xlsx';
import constants from 'src/app/constants/constants';

@Component({
  selector: 'app-sales-grid',
  templateUrl: './sales-grid.component.html',
  styleUrls: ['./sales-grid.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SalesGridComponent implements OnInit {
  sales: Sale[] = [];
  cities : string[] = [];
  productsData : string[] = [];
  productsCounter: product[] = [];
  selected: string = '';
  sourceGridData: any;
  chartTitle: string = 'Productos más vendidos (general)';

  // Constants
  columns = constants.columns;
  xAxis = constants.xAxis;
  seriesGroups = constants.seriesGroups;
  
  constructor() {
    
  }

  ngOnInit(): void {

  }

  getSelected() {
    if (this.selected == null) {
      this.sourceGridData = new jqx.dataAdapter({ localData: this.sales });
      this.setProducts(this.sales);
      this.chartTitle = 'Productos más vendidos (general)';
      return;
    };
    const filteredSales = this.sales.filter((sale) => sale.ciudad === this.selected);
    this.sourceGridData = new jqx.dataAdapter({ localData: filteredSales });
    this.setProducts(filteredSales);
    this.chartTitle = 'Productos más vendidos (' + this.selected + ')';
  }

  setCities() {
    this.cities = [...new Set(this.sales.map(sale => sale.ciudad))];
  };

  setProducts(sales : Sale[]) {
    this.productsData = sales.map(sale => sale.producto);
    let counter = this.productsData.reduce((count: any, currentValue: string) => {
      return (count[currentValue] ? ++count[currentValue] : (count[currentValue] = 1), count);
    }, {});
    counter = this.getMostSoldProducts(counter);
    this.productsCounter = Object.entries(counter).map(([product, count]) => ({ Producto: product, Valor: count }))
  }

  getMostSoldProducts(products : object) {
    let maxN = 5;

    let sortedProducts = Object.entries(products).sort((a, b) => {
      return b[1] - a[1];
    });
    if (maxN > sortedProducts.length) {
      maxN = sortedProducts.length;
    }
    let last = sortedProducts[maxN - 1][1];
    let entries = sortedProducts.filter((entry) => { return entry[1] >= last; });
    let mostSoldProducts = Object.fromEntries(entries);
    return mostSoldProducts;
  };

  readExcel($event: any) {
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
          this.setProducts(this.sales);
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

}
