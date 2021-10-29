// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KitchenComponent } from './kitchen.component';
import { GroupComponent } from './group.component';

// Food Kitchen Routing
import { FoodKitchenRoutingModule } from './foodkitchen-routing.module';
import { KitchenFakeService } from '../../store/kitchen/kitchen.fake.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddKitchenComponent } from './add-kitchen.component';

@NgModule({
  imports: [
    CommonModule,
    FoodKitchenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  declarations: [
    KitchenComponent,
    GroupComponent,
    AddKitchenComponent
  ],
  exports: [
    KitchenComponent,
    GroupComponent,
    AddKitchenComponent
  ],
  providers: [KitchenFakeService],
})
export class FoodKitchenModule { }
