import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';

@Component({
  selector: 'gsv-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.css'],
})
export class SaleTableComponent {
  @Input() data: any;
  @Input() metaDataColumns!: MetaDataColumn[];
  @Input() title: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  columns: string[] = [];

  @ContentChildren(MatColumnDef, { descendants: true })
  columnsDef!: QueryList<MatColumnDef>;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metaDataColumns']) {
      this.columns = this.metaDataColumns.map((x) => x.field);
    }
  }
}
