import { Component, OnInit } from '@angular/core';
import { Rental } from '../../models/rental.model';
import { RentalService } from '../../services/rental.service';
import { DialogService } from '../../services/dialog.service';
import { RentalTableComponent } from '../../components/rental-table/rental-table.component';

@Component({
  selector: 'rental-page',
  imports: [RentalTableComponent],
  templateUrl: './rental.page.html',
  styleUrl: './rental.page.scss',
})
export class RentalPage implements OnInit {
  header = ['first name', 'last name', 'vin', 'brand', 'start at', 'end at'];
  rentals: Rental[] = [];

  constructor(
    private rentalService: RentalService,
    private dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.rentalService.getActiveRentals().subscribe(
      (rentals) => {
        this.rentals = rentals;
      },
      (error) => {
        this.dialogService.openDialog({
          title: 'Error',
          message: error.error.message,
        });
      }
    );
  }
}
