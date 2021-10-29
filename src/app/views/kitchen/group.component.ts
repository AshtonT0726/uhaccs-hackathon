import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { KitchenGroup } from "../../core/model/kitchen";
import { KitchenFakeService } from "../../store/kitchen/kitchen.fake.service";

@Component({
  templateUrl: "group.component.html",
  styleUrls: ["group.component.css"],
})
export class GroupComponent implements OnInit {
  groups: KitchenGroup[];

  constructor(
    private kitchenService: KitchenFakeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.kitchenService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

  onGroup(clickedGroup: KitchenGroup) {
    console.log("onGroup", clickedGroup);
    this.router.navigate([
      "kitchen",
      {
        name: clickedGroup.name,
        id: clickedGroup.id,
        size: clickedGroup.kitchens.length,
      },
    ]);
  }
}
