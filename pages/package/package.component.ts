import { Component, OnInit } from '@angular/core';
import { FlightCardComponent } from "../../components/flight-card/flight-card.component";
import { TransitCardComponent } from "../../components/transit-card/transit-card.component";
import { CommonModule } from '@angular/common';
import { EventsArrayService } from '../../services/eventsArray/events-array.service';
import { CityItineraryComponent } from "../../components/city-itinerary/city-itinerary.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PackageFailedComponent } from "../../Errors/package-failed/package-failed.component";
import { AvailabilityFailedComponent } from "../../Errors/availability-failed/availability-failed.component";
import { eventsArr } from '../../services/eventsArray/demo';
import { PaymentServiceService } from '../../services/payment-service/payment-service.service';
import { PaymentDetails } from '../../models/payment-details';
import { FormsModule } from '@angular/forms';
// import { TransitcategorywiseComponent } from '../../transitscategorywise/transitscategorywise.component';
import { TransitCategorywiseComponent } from "../../components/transit-categorywise/transit-categorywise.component";
import { FlightCategorywiseComponent } from "../../components/flight-categorywise/flight-categorywise.component";
import { HotelsCategorywiseComponent } from "../../components/hotels-categorywise/hotels-categorywise.component";
import { SightCategorywiseComponent } from "../../components/sight-categorywise/sight-categorywise.component";
import { TransitcategorywiseComponent } from "../../components/transitcategorywise/transitcategorywise.component";
import { TestComponent } from "../../components/test/test.component";
@Component({
  selector: 'app-package',
  standalone: true,
  imports: [FlightCardComponent, FlightCardComponent, TransitCardComponent, CommonModule, CityItineraryComponent, LoaderComponent, PackageFailedComponent, AvailabilityFailedComponent, TransitCategorywiseComponent, FlightCategorywiseComponent, HotelsCategorywiseComponent, SightCategorywiseComponent, TransitcategorywiseComponent, TestComponent],
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnInit {

    isLoading:boolean=true;
    isPackageCreationFailed:boolean = false;
    isPackageAvailabilityFailed:boolean = false;

    routeKey:string="";

    private readonly packageId = "SDZJIZB"; // Readonly for constant values
   
    eventsArr:any[] | undefined=[];


    // payment breakdown
    paymentDetails: any={
        totalPublishedCost: 0,
        incentiveEarned: 0,
        tds: 0,
        platformCost: 0,
        paymentGatewayFee: 0,
        totalTripCost: 0
    };

    // inclusion and exclusion array
     // Dynamic arrays for inclusions and exclusions
  inclusions: string[] = [
    "Inclusion 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Inclusion 2: Phasellus malesuada nulla nec metus scelerisque interdum.",
    "Inclusion 3: Quisque gravida urna vel magna ultricies, vitae facilisis nisi dignissim."
  ];

  exclusions: string[] = [
    "Exclusion 1: Mauris vehicula sem at quam tincidunt, eget convallis mauris vestibulum.",
    "Exclusion 2: Fusce vel metus nec eros bibendum eleifend a sit amet enim.",
    "Exclusion 3: Proin vel diam ac sapien venenatis laoreet non ac lectus."
  ];

  // counts for badges
   // Example counts (replace with your logic)
   flightCount = 3;
   hotelCount = 0;
   sightseeingCount = 1;
   transitCount=2;

    constructor(private eventsService: EventsArrayService,private route: ActivatedRoute,private router: Router,private paymentService: PaymentServiceService){
        
    }
   
    async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.eventsArr= eventsArr
        this.isLoading = false;
        // try {
        //     this.route.queryParams.subscribe(async (params) => {
        //         const routeKey = params['route'];
    
        //         // Retrieve and parse route key from local storage if available
        //         const storedData = localStorage.getItem("routeKey");
        //         let storedRouteKey = null;
        //         let packageId = null;
    
        //         if (storedData) {
        //             const parsedData = JSON.parse(storedData);
        //             storedRouteKey = parsedData.routeKey;
        //             packageId = parsedData.packageId;
        //         }
    
        //         if (storedRouteKey === routeKey && packageId) {
        //             // Fetch data based on stored packageId
        //             try {
        //                 const existingPackage = await this.eventsService.getPackageBasedOnPackageId(packageId);
        //                 if (existingPackage) {
        //                     this.eventsArr = existingPackage;
        //                     this.isLoading = false;
        //                 } else {
        //                     this.isPackageCreationFailed = true;
        //                 }
        //             } catch (error) {
        //                 console.error('Error fetching package by ID:', error);
        //                 this.isPackageCreationFailed = true;
        //             }
        //         } else {
        //             // Fetch new data if routeKey does not match
        //             try {
        //                 const newPackageEventsArr = await this.eventsService.getNewPackage(routeKey);
        //                 if (newPackageEventsArr && newPackageEventsArr.length > 0) {
        //                     this.eventsArr = newPackageEventsArr;
        //                     this.isLoading = false;
        //                 } else {
        //                     this.isPackageCreationFailed = true;
        //                 }
        //             } catch (error) {
        //                 console.error('Error fetching new package:', error);
        //                 this.isPackageCreationFailed = true;
        //             }
        //         }
        //     });
        // } catch (error) {
        //     console.error('Error in queryParams subscription:', error);
        //     this.isPackageCreationFailed = true;
        // }
        this.paymentDetails = this.paymentService.formatPaymentDetails();
        console.log(this.paymentDetails)
    }
    
    
    async handlePackageAvailabiity(){
        this.isLoading = true;
         const eventsAfterAvailability = await this.eventsService.checkPackageAvailability();

         if(!eventsAfterAvailability){
            console.error("Unable to check the availability of package");
            this.isPackageAvailabilityFailed = true;
            this.isLoading= false;
         }
         else{
             console.log(eventsAfterAvailability);
             this.eventsArr = eventsAfterAvailability;
             this.isLoading = false;
         }

    }

    handlePackageCheckoutNavigation(){
        // Replace '/checkout' with the actual route path you want to navigate to
        this.router.navigate(['/checkout']);
    }

      // tabs for sections
  activeTab: string = 'trips';
  scrollToSection(tabId: string) {
    this.activeTab = tabId;
      const element = document.getElementById(tabId);
      if (element) {       
        element.scrollIntoView({ behavior: 'smooth' });
      }
  }
  
}
