import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Kitchen } from "../../core/model/kitchen";
import { jerseyCityGroup } from "../../core/model/kitchen-constants";
import { KitchenFakeService } from "../../store/kitchen/kitchen.fake.service";
import { AddKitchenComponent } from "./add-kitchen.component";

@Component({
  templateUrl: "kitchen.component.html",
})
export class KitchenComponent implements OnInit {
  selectedGroupId: number = jerseyCityGroup.id;
  selectedGroupName: string = jerseyCityGroup.name;
  selectedGroupSize: number = jerseyCityGroup.kitchens.length;

  asyncKitchens: Observable<Kitchen[]>;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private kitchenService: KitchenFakeService,
    private matDialog: MatDialog
  ) {}

  // public themeColors(): void {
  //   Array.from(this._document.querySelectorAll('.theme-color')).forEach((el: HTMLElement) => {
  //     const background = getStyle('background-color', el);
  //     const table = this._document.createElement('table');
  //     table.innerHTML = `
  //       <table class="w-100">
  //         <tr>
  //           <td class="text-muted">HEX:</td>
  //           <td class="font-weight-bold">${rgbToHex(background)}</td>
  //         </tr>
  //         <tr>
  //           <td class="text-muted">RGB:</td>
  //           <td class="font-weight-bold">${background}</td>
  //         </tr>
  //       </table>
  //     `;
  //     el.parentNode.appendChild(table);
  //   });
  // }

  ngOnInit(): void {
    // this.themeColors();
    this.asyncKitchens = this.kitchenService.getKitchensByGroup(
      this.selectedGroupId
    );
    
    this.activatedRouter.paramMap.subscribe((params) => {
      this.selectedGroupId = Number(params.get("id"));
      this.selectedGroupName = String(params.get("name"));
      this.selectedGroupSize = Number(params.get("size"));
      this.asyncKitchens = this.kitchenService.getKitchensByGroup(
        this.selectedGroupId
      );
    });
  }

  addKitchenDialog() {
    console.log("addNeedDialog");

    const dialogRef = this.matDialog.open(AddKitchenComponent, {
      data: {},
      width: "600px",
      height: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Kitchen) => {
      this.addKitchen(result);
    });
  }

  addKitchen(kitchenToAdd: Kitchen) {
    this.kitchenService.createKitchen(this.selectedGroupId, kitchenToAdd);
  }

  onKitchen(clickedKitchen: Kitchen) {
    console.log("onKitchen", clickedKitchen);
    this.router.navigate([
      "../dailyneeds/calendar",
      {
        name: clickedKitchen.name,
        id: clickedKitchen.id,
      },
    ]);
  }
}
