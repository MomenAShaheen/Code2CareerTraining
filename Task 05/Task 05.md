# Node.js Core HTTP Modules Comparison

## 📦 Modules Overview

### 1. `http` Module
- **Purpose**: Creates HTTP/1.1 servers and clients
- **Protocol**: HTTP/1.1 (text-based)
- **Features**:
  - Basic request/response model
  - Supports keep-alive connections
  - No encryption by default

### 2. `https` Module
- **Purpose**: Creates secure HTTP/1.1 servers/clients
- **Protocol**: HTTP/1.1 over TLS/SSL
- **Features**:
  - Same as `http` but with encryption
  - Requires SSL certificates
  - Default port 443

### 3. `http2` Module
- **Purpose**: Implements HTTP/2 protocol
- **Protocol**: Binary protocol (HTTP/2)
- **Features**:
  - Multiplexing (multiple requests over single connection)
  - Header compression (HPACK)
  - Server push capability
  - Can work with or without TLS

## 🔍 Key Technical Differences

| Feature          | HTTP/1.1                  | HTTP/2                     |
|------------------|---------------------------|----------------------------|
| **Protocol**     | Text-based                | Binary                     |
| **Multiplexing** | No (head-of-line blocking)| Yes                        |
| **Compression**  | Headers sent as-is        | HPACK header compression   |
| **Server Push**  | Not available             | Supported                  |
| **Flow Control** | Basic                     | Advanced                   |
| **TLS**          | Optional                  | De facto required          |

## 🚀 When to Use Each Module

### Use `http` when:
- Building simple APIs/internal services
- Performance isn't critical
- No need for encryption
- Legacy system compatibility required

### Use `https` when:
- Handling sensitive data
- Public-facing web services
- Required by browsers (forms, APIs)
- Any production-facing service

### Use `http2` when:
- High-performance applications
- Serving many concurrent requests
- Reducing latency is critical
- Modern browsers/applications (95%+ support HTTP/2)
