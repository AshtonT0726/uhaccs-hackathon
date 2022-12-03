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
        path: "kitchen",
        loadChildren: () =>
          import("./views/kitchen/foodkitchen.module").then(
            (m) => m.FoodKitchenModule
          ),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "dailyneeds",
        loadChildren: () =>
          import("./views/dailyneeds/dailyneeds.module").then(
            (m) => m.DailyNeedsModule
          ),
          pathMatch: 'prefix'
      },
      {
        path: "donor",
        loadChildren: () =>
          import("./views/donor/donor.module").then((m) => m.DonorModule),
      },
      {
        path: "dailydonations",
        loadChildren: () =>
          import("./views/dailydonations/dailydonations.module").then(
            (m) => m.DailyDonationsModule
          ),
      },
      {
        path: "dining",
        loadChildren: () =>
          import("./views/dining/dining.module").then((m) => m.DiningModule),
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
