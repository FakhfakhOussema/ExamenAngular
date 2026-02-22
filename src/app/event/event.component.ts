import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Evt } from '../Modeles/Evt';
import { EvtService } from 'src/services/evt.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'titre', 'dateDebut', 'dateFin', 'lieu', 'actions'];
  dataSource = new MatTableDataSource<Evt>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private evtService: EvtService, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.refreshAll();
  }

  refreshAll(): void {
    this.evtService.getAllEvents().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  open() {
    let dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.evtService.addEvent(result).subscribe((data) => {
            this.refreshAll();
          
        });
      }
    }); 
  }

  deleteEvent(id: string) {
    this.evtService.deleteEvent(id).subscribe(() => {
      this.refreshAll();
    });
  }

  openEdit(id: string) {

    const config = new MatDialogConfig();
    config.data = id;

    let dialogRef = this.dialog.open(ModalComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.evtService.updateEvent(id, result).subscribe((e) => {
            this.refreshAll();
        });
      }
    });
    
  }
}
