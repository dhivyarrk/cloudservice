import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WomensclothesComponent } from './womensclothes/womensclothes.component';
import { WomensaccessoriesComponent } from './womensaccessories/womensaccessories.component';
import { KidsclothesComponent } from './kidsclothes/kidsclothes.component';
import { KidsshoesComponent } from './kidsshoes/kidsshoes.component';
import { SigninComponent } from './signin/signin.component';
import { CallbackComponent } from './callback/callback.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactComponent } from './contact/contact.component';


export const routes: Routes = [
    { path: '', component: LandingpageComponent }, // Default route
    { path: 'signup', component: SignupComponent }, 
    { path: 'login', component: LandingpageComponent },
    { path: 'callback', component: CallbackComponent }, // Adjust if you need to redirect to a different component

    { path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: 'womenclothes', component: WomensclothesComponent }, // Child route
          { path: 'womensaccessories', component: WomensaccessoriesComponent },
          { path: 'kidsclothes', component: KidsclothesComponent },
          { path: 'kidsshoes', component: KidsshoesComponent },
          { path: 'checkout', component: CheckoutComponent },
          { path: 'payment', component: PaymentComponent},
          { path: 'contact', component: ContactComponent},

        ], 
    },
    //{ path: 'payment', component: PaymentComponent},
  
    { path: 'signin', component: SigninComponent }, 

];