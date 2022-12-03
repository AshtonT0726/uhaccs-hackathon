import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Import Containers
import { DefaultLayoutComponent } from "./containers";
import { LoginComponent } from "./views/login/login.component";

export const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "base",
        loadChildren: () =>
          import("./views/base/base.module").then((m) => m.BaseModule),
      },
      {
        path: "buttons",
        loadChildren: () =>
          import("./views/buttons/buttons.module").then((m) => m.ButtonsModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./views/chartjs/chartjs.module").then((m) => m.ChartJSModule),
      },
      {
        path: "guest",
        loadChildren: () =>
          import("./views/guest/guest.module").then(
            (m) => m.GuestModule
          ),
      },
      {
        path: "dining",
        loadChildren: () =>
          import("./views/dining/dining.module").then((m) => m.DiningModule),
      },
      {
        path: "diningcalendar",
        loadChildren: () =>
        import("./views/diningcalendar/diningcalendar.module").then((m) => m.DiningCalendarModule),
      },
      {
        path: "volunteer",
        loadChildren: () =>
          import("./views/volunteer/volunteer.module").then(
            (m) => m.VolunteerModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
