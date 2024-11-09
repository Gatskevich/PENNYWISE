# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory in the container
WORKDIR /src

# Copy the csproj and restore the dependencies (via NuGet)
COPY ["api.csproj", "./"]
RUN dotnet restore "api.csproj"

# Copy the entire project and build the app
COPY . .
WORKDIR "/src"
RUN dotnet publish "api.csproj" -c Release -o /app/publish

# Use the official .NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

# Copy the built app from the build stage
COPY --from=build /app/publish .

# Set the entrypoint for the container to run the app
ENTRYPOINT ["dotnet", "api.dll"]
