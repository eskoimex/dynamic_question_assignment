# Question Rotation System

## Overview

This project implements a dynamic question rotation system that assigns questions to users based on their region and a configurable cycle duration. Built with **NestJS**, **Prisma**, and **MongoDB**, the system allows administrators to configure how frequently questions rotate (e.g., weekly, bi-weekly) and ensures that each region receives questions specific to that locale. 

The project is designed with scalability in mind, capable of handling **100,000+ daily active users** and scaling to support millions of global users.

---

## Features

- **Region-Specific Question Assignment**: Questions are assigned based on a user’s region, ensuring each region follows a unique question sequence.
- **Configurable Cycle Duration**: Cycle duration is adjustable on a per-region basis, allowing flexible rotation intervals (e.g., 7 days, 14 days).
- **Efficient Querying**: The design leverages efficient querying and a streamlined schema to handle high user volumes with minimal overhead.
- **REST API Endpoints**: API endpoints support the retrieval of questions, configuration management, and the customization of cycle settings.

---

## System Architecture

### Data Models

#### 1. **Question Model**
   - Stores each question, its region association, and the assigned cycle. 
   - Fields:
      - `id`: Unique identifier.
      - `content`: Text content of the question.
      - `regionId`: References the region associated with this question.
      - `cycle`: Cycle number for question rotation.

#### 2. **Region Model**
   - Stores region-specific configurations, including the cycle duration and the starting date for calculating question cycles.
   - Fields:
      - `id`: Unique identifier.
      - `name`: Name of the region.
      - `cycleDuration`: Duration of each cycle in days (default 7 days).
      - `startDate`: Start date for calculating the current cycle.

#### 3. **User Model**
   - Represents users in the system, each linked to a specific region to receive region-appropriate questions.
   - Fields:
      - `id`: Unique identifier.
      - `regionId`: Identifier of the region the user is associated with.

---

### Key Concepts

1. **Cycle Calculation**: The current cycle is calculated based on each region’s `startDate` and `cycleDuration`, enabling question assignments to change dynamically as each cycle completes.
2. **Configurable Cycles**: Administrators can set and update the `cycleDuration` and `startDate` on a per-region basis. This allows flexible customization of the question rotation frequency across different regions.
3. **Dynamic Question Assignment**: Questions are dynamically assigned based on the current cycle and region, using a calculated `cycleNumber` to index into each region’s question list.

### Scalability Considerations

- **Efficient Data Access**: The cycle logic is calculated in-memory, reducing load on MongoDB and supporting high query volumes.
- **Minimal Database Updates**: Cycle durations and configurations can be adjusted without excessive recalculation or database locking.
- **Horizontally Scalable**: With MongoDB’s document-based design, the system can handle high user volumes and be horizontally scaled if necessary.

---

## Implementation

### Cycle Calculation Logic

The `CycleService` calculates the current cycle based on `startDate` and `cycleDuration`, enabling question assignment changes as cycles complete. Here’s an example of the calculation:

```typescript
const timeDifference = now.getTime() - new Date(startDate).getTime();
const cycleNumber = Math.floor(timeDifference / (cycleDuration * 24 * 60 * 60 * 1000)) + 1;
```


### Database Seeding

A seed script is provided to initialize the database with sample regions and questions, facilitating a smooth development setup.

### Pros and Cons of the Design
## Pros
**Efficiency and Scalability**: By linking users to regions with specific cycle configurations, the system minimizes the need for constant recalculations and supports a high volume of users.

**Flexible Cycle Configuration**: The system’s design allows administrators to adjust the question rotation frequency independently for each region.

**Dynamic Assignment**: With the current cycle calculation based on region-specific configurations, questions can be dynamically assigned, allowing for adaptive user experiences.

## Cons
**Potential Redundancy in Configuration**: If multiple regions need identical configurations, updating each region independently may lead to slight overhead.
Complexity with Multiple Regions: As the number of regions grows, managing cycle configurations could become more challenging without a centralized configuration management system.

**Scalability Limitation with MongoDB**: Although MongoDB can handle large datasets, extremely high query volumes or complex relational data might require switching to a more relational database, like PostgreSQL, for better performance.

## Future Improvements
**Caching**: Implementing a caching layer for frequently accessed data (e.g., current cycle information) can enhance performance.

**Automated Cycle Update**: Set up a scheduled task to precompute cycles in advance, reducing real-time load during peak usage.

**Multi-Region Support Enhancements**: Consider consolidating duplicate configurations if multiple regions require the same cycle settings to reduce manual overhead.

## API Endpoints

### 1. Get Current Question by Region
- **Endpoint:** `GET /questions/:regionId`
- **Description:** Retrieves the question assigned for the current cycle in a specified region.

### 2. Update Cycle Configuration
- **Endpoint:** `PATCH /cycle/config/:regionId`
- **Description:** Updates `cycleDuration` and `startDate` for a specific region.
- **Request Body:**
  ```json
  {
    "cycleDuration": 14,
    "startDate": "2024-01-08T11:00:00Z"
  }

---

## Project setup

# Install Dependencies:
```
npm install
```
Configure Environment: Set DATABASE_URL in the .env file to your MongoDB connection URL.


# Run Migrations:
```
npx prisma migrate dev
```

# Seed Database:
```
npm run seed
```

# Start Server:
```
npm run start
```

With this design, the question rotation system provides a robust, scalable, and flexible solution, handling various cycle configurations with a focus on global scalability.