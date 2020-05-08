import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Output() redirect: EventEmitter<any> = new EventEmitter();

  constructor(private service: ProductService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {

  }

  currentPrdId;

  openConfirmationDialog(id) {
    this.confirmationDialogService.confirm('Delete Product', 'Are you sure you want to delete this product?', 'Delete', 'Back')
      .then((confirmed) => {
        if (confirmed)
          this.delete(id);
      })
      .catch(() => {
        //console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      });
  }

  GoToEdit(id) {
    this.router.navigate(['admin/edit', id]);
    console.log(id);
    this.currentPrdId = id;
  }


  delete(id) {
    console.log(id);
    this.service.deleteProduct(id)
      .subscribe((response) => { console.log(response) }, (err) => { console.log(err) });
    this.prd.isDeleted = true;
    // window.location.reload();
  }

  @Input() prd;
}

