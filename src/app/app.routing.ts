import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Import Containers
import { DefaultLayoutComponent } from "./containers";
import { LoginComponent } from "./views/login/login.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
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
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "kitchen",
        loadChildren: () =>
          import("./views/kitchen/foodkitchen.module").then(
            (m) => m.FoodKitchenModule
          ),
      },
      {
        path: "dailyneeds",
        loadChildren: () =>
          import("./views/dailyneeds/dailyneeds.module").then(
            (m) => m.DailyNeedsModule
          ),
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
