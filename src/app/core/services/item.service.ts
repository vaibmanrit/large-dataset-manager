import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker'; // Import Faker.js
import { Item } from 'src/app/store/item/item.model'; // Adjust the import path

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // Internal state to hold items
  private items: Item[] = this.generateInitialItems(); // Initialize with some fake items

  constructor() {}

  // Generate a single fake item
  private generateFakeItem(id: number): Item {
    return {
      id,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
    };
  }

  // Initialize with some fake items
  private generateInitialItems(): Item[] {
    return Array.from({ length: 20 }).map((_, index) =>
      this.generateFakeItem(index + 1)
    );
  }

  // Fetch all items
  getItems(): Item[] {
    return [...this.items]; // Return a copy of the items array
  }

  // Fetch an item by ID
  getItemById(id: number): Item | null {
    return this.items.find((item) => item.id === id) || null; // Return the item or null
  }

  // Method to add an item
  addItem(item: Item): Item {
    // Ensure the item does not already exist by checking the ID
    if (!this.items.some((existingItem) => existingItem.id === item.id)) {
      this.items.push(item); // Add the new item to the items array
    }
    return item; // Return the added item
  }

  // Method to edit an item
  editItem(updatedItem: Item): Item | null {
    const index = this.items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem; // Update the existing item in the items array
      return updatedItem; // Return the updated item
    }
    return null; // Return null if the item was not found
  }
}
