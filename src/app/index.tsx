import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: "1",
    name: "Boerewors Sampler",
    description: "Grilled South African sausage with spicy tomato relish",
    price: 65.99,
    category: "Starters",
  },
  {
    id: "2",
    name: "Bunny Chow",
    description: "Hollowed bread loaf filled with spiced curry",
    price: 75.99,
    category: "Starters",
  },
  {
    id: "3",
    name: "Sosaties",
    description: "Skewered lamb with apricot and spice glaze",
    price: 85.99,
    category: "Starters",
  },

  // Main Courses
  {
    id: "4",
    name: "Bobotie",
    description: "Spiced mince meat baked with egg topping and raisins",
    price: 165.99,
    category: "Main Courses",
  },
  {
    id: "5",
    name: "Springbok Loin",
    description: "Premium game meat with berry jus and roasted vegetables",
    price: 245.99,
    category: "Main Courses",
  },
  {
    id: "6",
    name: "Kingklip Catch",
    description: "Pan-seared South African fish with lemon butter and saffron rice",
    price: 185.99,
    category: "Main Courses",
  },
  {
    id: "7",
    name: "Potjiekos",
    description: "Traditional slow-cooked stew with beef, vegetables and herbs",
    price: 155.99,
    category: "Main Courses",
  },

  // Desserts
  {
    id: "8",
    name: "Malva Pudding",
    description: "Warm sponge pudding with sticky toffee sauce and vanilla ice cream",
    price: 59.99,
    category: "Desserts",
  },
  {
    id: "9",
    name: "Koeksister",
    description: "Crispy spiced dough stick dipped in golden syrup",
    price: 45.99,
    category: "Desserts",
  },
  {
    id: "10",
    name: "Milk Tart (Melktert)",
    description: "Sweet creamy custard tart with cinnamon",
    price: 52.99,
    category: "Desserts",
  },
];

const styles = StyleSheet.create({
  // Welcome Screen
  welcomeContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    padding: 20,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    color: "#333",
    marginBottom: 10,
  },
  welcomeBrand: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#cc0000",
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: "#666",
  },
  welcomeButton: {
    backgroundColor: "#ffeb3b",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#cc0000",
  },
  welcomeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#cc0000",
  },

  // Common
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#ffeb3b",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 3,
    borderBottomColor: "#cc0000",
  },
  detailHeader: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#ffeb3b",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#cc0000",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#cc0000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#cc0000",
  },
  cartBadge: {
    backgroundColor: "#cc0000",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeDisabled: {
    backgroundColor: "#ccc",
  },
  cartBadgeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    color: "#cc0000",
    fontSize: 16,
    fontWeight: "600",
  },

  // Category Scroll
  categoryScroll: {
    backgroundColor: "#ffffff",
  },
  categoryContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "#ffeb3b",
  },
  categoryButtonActive: {
    backgroundColor: "#ffeb3b",
    borderColor: "#cc0000",
  },
  categoryText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#cc0000",
    fontWeight: "bold",
  },

  // Menu List
  menuList: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  menuItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#cc0000",
    borderWidth: 1,
    borderColor: "#ffeb3b",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#cc0000",
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#cc0000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: "#ffffff",
  },
  itemDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#ffeb3b",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#cc0000",
  },
  addButtonText: {
    color: "#cc0000",
    fontWeight: "600",
    fontSize: 14,
  },

  // Item Detail
  detailContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  detailCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#cc0000",
    borderWidth: 2,
    borderColor: "#ffeb3b",
  },
  detailName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#cc0000",
    marginBottom: 12,
  },
  detailMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#ffeb3b",
  },
  detailCategory: {
    fontSize: 13,
    color: "#cc0000",
    fontWeight: "500",
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#cc0000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  detailButtonContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  detailAddButton: {
    backgroundColor: "#ffeb3b",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#cc0000",
  },
  detailAddButtonText: {
    color: "#cc0000",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Cart
  cartList: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  cartItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffeb3b",
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#cc0000",
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
    backgroundColor: "#cc0000",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#ffeb3b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#cc0000",
  },
  quantityButtonText: {
    color: "#cc0000",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityText: {
    fontSize: 14,
    color: "#cc0000",
    fontWeight: "500",
    minWidth: 24,
    textAlign: "center",
  },
  cartFooter: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderTopWidth: 3,
    borderTopColor: "#ffeb3b",
    backgroundColor: "#f9f9f9",
  },
  cartTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cartTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  cartTotalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#cc0000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  checkoutButton: {
    backgroundColor: "#ffeb3b",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#cc0000",
  },
  checkoutButtonText: {
    color: "#cc0000",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  emptyCartButton: {
    backgroundColor: "#ffeb3b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#cc0000",
  },
  emptyCartButtonText: {
    color: "#cc0000",
    fontWeight: "600",
    fontSize: 14,
  },

  // Checkout
  checkoutContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
  checkoutCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#cc0000",
    borderWidth: 2,
    borderColor: "#ffeb3b",
  },
  checkoutSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#cc0000",
    marginBottom: 16,
  },
  checkoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ffeb3b",
  },
  checkoutItemName: {
    fontSize: 14,
    color: "#666",
  },
  checkoutItemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    backgroundColor: "#cc0000",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  checkoutDivider: {
    height: 2,
    backgroundColor: "#ffeb3b",
    marginVertical: 12,
  },
  checkoutTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  checkoutTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  checkoutTotalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#cc0000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  checkoutFooter: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderTopWidth: 3,
    borderTopColor: "#ffeb3b",
    backgroundColor: "#f9f9f9",
  },
  placeOrderButton: {
    backgroundColor: "#ffeb3b",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#cc0000",
  },
  placeOrderButtonText: {
    color: "#cc0000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function Index() {
  const [appState, setAppState] = useState<"welcome" | "menu" | "itemDetail" | "cart" | "checkout">("welcome");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const categories = ["All", ...new Set(MENU_ITEMS.map((item) => item.category))];

  const filteredItems =
    selectedCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  // Navigation functions
  const goToMenu = () => {
    setAppState("menu");
    setSelectedCategory("All");
  };

  const viewItemDetail = (item: MenuItem) => {
    setSelectedItem(item);
    setAppState("itemDetail");
  };

  const goToCart = () => {
    if (totalItems > 0) {
      setAppState("cart");
    }
  };

  const goBack = () => {
    setAppState("menu");
  };

  // Cart functions
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((c) => c.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setTotalItems(totalItems + 1);
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find((c) => c.id === itemId);
    if (item) {
      setTotalItems(totalItems - item.quantity);
      setCart(cart.filter((c) => c.id !== itemId));
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      const oldItem = cart.find((c) => c.id === itemId);
      const diff = quantity - (oldItem?.quantity || 0);
      setTotalItems(totalItems + diff);
      setCart(
        cart.map((c) =>
          c.id === itemId ? { ...c, quantity } : c
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Render functions
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => viewItemDetail(item)}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={(e) => {
          e.stopPropagation();
          addToCart(item);
        }}
      >
        <Text style={styles.addButtonText}>+ Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>R{(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Welcome Screen
  if (appState === "welcome") {
    return (
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Welcome to</Text>
          <Text style={styles.welcomeBrand}>Chef's Menu</Text>
          <Text style={styles.welcomeSubtitle}>Fine Dining Experience</Text>
        </View>
        <TouchableOpacity style={styles.welcomeButton} onPress={goToMenu}>
          <Text style={styles.welcomeButtonText}>Browse Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Menu Screen
  if (appState === "menu") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Chef's Menu</Text>
            <Text style={styles.subtitle}>Select your favorites</Text>
          </View>
          <TouchableOpacity
            style={[styles.cartBadge, totalItems === 0 && styles.cartBadgeDisabled]}
            onPress={goToCart}
          >
            <Text style={styles.cartBadgeText}>{totalItems}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={styles.menuList}
        />
      </View>
    );
  }

  // Item Detail Screen
  if (appState === "itemDetail" && selectedItem) {
    return (
      <View style={styles.container}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartBadge}
            onPress={goToCart}
          >
            <Text style={styles.cartBadgeText}>{totalItems}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailContent}>
          <View style={styles.detailCard}>
            <Text style={styles.detailName}>{selectedItem.name}</Text>
            <View style={styles.detailMeta}>
              <Text style={styles.detailCategory}>{selectedItem.category}</Text>
              <Text style={styles.detailPrice}>R{selectedItem.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.detailDescription}>{selectedItem.description}</Text>
          </View>
        </View>

        <View style={styles.detailButtonContainer}>
          <TouchableOpacity
            style={styles.detailAddButton}
            onPress={() => {
              addToCart(selectedItem);
              goBack();
            }}
          >
            <Text style={styles.detailAddButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Cart Screen
  if (appState === "cart") {
    return (
      <View style={styles.container}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.cartTitle}>Your Cart</Text>
          <View style={{ width: 40 }} />
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity
              style={styles.emptyCartButton}
              onPress={goBack}
            >
              <Text style={styles.emptyCartButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              data={cart}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={true}
              contentContainerStyle={styles.cartList}
            />
            <View style={styles.cartFooter}>
              <View style={styles.cartTotalRow}>
                <Text style={styles.cartTotalLabel}>Total:</Text>
                <Text style={styles.cartTotalPrice}>R{cartTotal.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => setAppState("checkout")}
              >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }

  // Checkout Screen
  if (appState === "checkout") {
    return (
      <View style={styles.container}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setAppState("cart")} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.cartTitle}>Checkout</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.checkoutContent}>
          <View style={styles.checkoutCard}>
            <Text style={styles.checkoutSectionTitle}>Order Summary</Text>
            {cart.map((item) => (
              <View key={item.id} style={styles.checkoutItem}>
                <Text style={styles.checkoutItemName}>{item.name} x{item.quantity}</Text>
                <Text style={styles.checkoutItemPrice}>R{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.checkoutDivider} />
            <View style={styles.checkoutTotal}>
              <Text style={styles.checkoutTotalLabel}>Total Amount:</Text>
              <Text style={styles.checkoutTotalAmount}>R{cartTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkoutFooter}>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={() => {
              alert("Order placed successfully!");
              setCart([]);
              setTotalItems(0);
              setAppState("welcome");
            }}
          >
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
