import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NgRx imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemReducer } from './store/item/item.reducer'; // Ensure the path is correct
import { ItemEffects } from './store/item/item.effects'; // Ensure the path is correct

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemService } from './core/services/item.service';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    StoreModule.forRoot({ item: itemReducer }),
    EffectsModule.forRoot([ItemEffects]),

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    ScrollingModule,
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
