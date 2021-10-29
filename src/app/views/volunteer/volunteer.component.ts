import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DonationEvent } from "../../core/model/donation-event";
import { Volunteer } from "../../core/model/volunteer";
import { me } from "../../core/model/volunteer-constants";

@Component({
  templateUrl: "volunteer.component.html",
  styleUrls: ["volunteer.component.css"],
})
export class VolunteerComponent implements OnInit {
  volunteer: Volunteer = me;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onKitchen(event: DonationEvent) {
    console.log("onKitchen", event);
    this.router.navigate([
      "../dailyneeds/calendar",
      {
        name: event.kitchen.name,
        id: event.kitchen.id,
        date: event.date
      },
    ]);
  }

  onDonor(event: DonationEvent) {
    console.log("onDonor", event);
    this.router.navigate([
      "../dailydonations/calendar",
      {
        name: event.donor.name,
        id: event.donor.id,
        date: event.date
      },
    ]);
  }  
}
