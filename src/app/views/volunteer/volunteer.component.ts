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

  onGuest(event: DonationEvent) {
    console.log("onGuest", event);
    this.router.navigate([
      "../dailyneeds/calendar",
      {
        name: event.guest.name,
        id: event.guest.id,
        date: event.date
      },
    ]);
  }
}
