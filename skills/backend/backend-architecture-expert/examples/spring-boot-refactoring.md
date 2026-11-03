# Refactoring Case Study: From Spaghetti Controller to Clean Architecture

## Vorher (Problematic Code)
```java
@RestController
@RequestMapping("/orders")
public class BadOrderController {
    @Autowired
    private OrderRepository orderRepo; // Code Smell: Controller greift direkt auf DB zu

    @PostMapping("/create") // Code Smell: Verb im URL
    public Order createOrder(@RequestBody Order order) { // Code Smell: Entity im Request/Response
        // Ungeprüfte Geschäftslogik im Controller
        if (order.getItems().isEmpty()) {
            throw new RuntimeException("Empty order");
        }
        order.setStatus("CREATED");
        order.setCreatedAt(LocalDateTime.now());
        return orderRepo.save(order);
    }
}
```

## Nachher (Refactored Clean Code)
```java
// 1. Controller: Kümmert sich ausschließlich um Web-Transport
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @Valid @RequestBody CreateOrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(location).body(response);
    }
}

// 2. Service: Handhabt Transaktionsgrenzen und Business-Regeln
@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Override
    public OrderResponse createOrder(CreateOrderRequest request) {
        Order order = orderMapper.toEntity(request);
        order.initialize(); // Domain-Logik in Entity/Aggregate
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toResponse(savedOrder);
    }
}

// 3. Immutables DTOs mit Java Records
public record CreateOrderRequest(
    @NotNull UUID customerId,
    @NotEmpty List<OrderItemRequest> items
) {}

public record OrderResponse(
    UUID id,
    String status,
    BigDecimal totalAmount,
    Instant createdAt
) {}
```

