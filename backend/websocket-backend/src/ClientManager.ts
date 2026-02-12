import WebSocket from "ws";
import { prisma } from "./prisma.js";

type Role = "USER" | "ADMIN";

interface Client {
  ws: WebSocket;
  userId: string;
  role: Role;
}

interface LocationMessage {
  type: "LOCATION";
  payload: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    speed?: number;
    heading?: number;
    source: "GPS" | "NETWORK";
  };
}

export class ClientManager {
  private static clients: Client[] = [];

  constructor(
    private ws: WebSocket,
    private userId: string,
    private role: Role
  ) {
    ClientManager.clients.push({ ws, userId, role });

    ws.on("message", (data) => {
      const message = JSON.parse(data.toString()) as LocationMessage;
      this.handleMessage(message);
    });

    ws.on("close", () => this.cleanup());
  }

  private async handleMessage(message: LocationMessage) {
    if (this.role !== "USER") return;
    if (message.type !== "LOCATION") return;

    const location = message.payload;

    await prisma.locationLog.create({
      data: {
        userId: this.userId,
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        speed: location.speed,
        heading: location.heading,
        source: location.source,
        riskScore: this.calculateRisk(
          location.latitude,
          location.longitude
        ),
      },
    });

    ClientManager.sendToAdmins(this.userId, location);
  }

  private static sendToAdmins(userId: string, location: LocationMessage["payload"]) {
    for (const client of ClientManager.clients) {
      if (client.role === "ADMIN" && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(
          JSON.stringify({
            type: "USER_LOCATION",
            userId,
            ...location,
          })
        );
      }
    }
  }

  private calculateRisk(_: number, __: number): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  private cleanup() {
    ClientManager.clients = ClientManager.clients.filter(
      (c) => c.ws !== this.ws
    );
  }
}
