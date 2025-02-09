# Build stage - Use Go 1.23 to match your go.mod
FROM golang:1.23 AS builder  

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum and download dependencies
COPY go.mod go.sum ./

# Ensure dependencies are updated correctly
RUN go mod tidy
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go binary with CGO disabled for a static binary
RUN CGO_ENABLED=0 GOOS=linux go build -o dvt .

# Final stage - Use a minimal image for production
FROM alpine:latest

# Install certificates for HTTPS communication (if needed)
RUN apk --no-cache add ca-certificates

# Set the working directory for the runtime container
WORKDIR /root/

# Copy the compiled binary and other necessary files from the builder stage
COPY --from=builder /app/dvt .
COPY --from=builder /app/googleCredentials.json .
COPY --from=builder /app/serviceAccountKey.json .

# Expose the port the service listens on (as defined in your main.go)
EXPOSE 8080

# Run the binary
CMD ["./dvt"]
