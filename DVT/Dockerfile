# Build stage
FROM golang:1.20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code and configuration files
COPY . .

# Build the Go binary with CGO disabled for a static binary
RUN CGO_ENABLED=0 GOOS=linux go build -o dvt .

# Final stage
FROM alpine:latest

# Install certificates for HTTPS communication (if needed)
RUN apk --no-cache add ca-certificates

# Set the working directory for the runtime container
WORKDIR /root/

# Copy the compiled binary and other necessary files from the builder stage
COPY --from=builder /app/dvt .
COPY --from=builder /app/static ./static
COPY --from=builder /app/googleCredentials.json .
COPY --from=builder /app/serviceAccountKey.json .

# Expose the port the service listens on (as defined in your main.go)
EXPOSE 8080

# Run the binary
CMD ["./dvt"]