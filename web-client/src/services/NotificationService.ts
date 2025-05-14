import { clientAuthAxios } from "@/utils/clientAxios";

export class NotificationService {
  get({ id }: { id: string }) {
    const uri = `/user/notifications/${{ id }}`;
    return clientAuthAxios()
      .get(uri)
      .then((res) => res?.data)
      .catch((err) => err?.response?.data);
  }
  list() {
    const uri = `/user/notifications/all`;
    return clientAuthAxios()
      .get(uri)
      .then((res) => res?.data)
      .catch((err) => err?.response?.data);
  }
}
