import { createResource, For, Match, Show, Switch } from "solid-js";
import {Link } from "solid-app-router";
import { FaSolidUsers } from "solid-icons/fa";
import Empty from "../../components/shared/Empty";
import UserAvatar from "../../components/ui/dataDisplay/UserAvatar";
import { fetchGroupNotifications } from "../../services";
import { getRelativeTime } from "../../utils/dateTime";
export default function GroupNotifications() {
  const [resource] = createResource(fetchGroupNotifications);
  return (
    <div className="my-4">
      <Switch>
        <Match when={resource.loading}>
          <p>Loading...</p>
        </Match>
        <Match when={resource.error}>
          <p>Error</p>
        </Match>

        <Match when={resource()}>
          <Show
            when={resource().data.data.notifications.length > 0}
            fallback={
              <Empty
                title="No Notifications"
                subTitle="You will be notify when somthing will happen in group"
              />
            }
          >
            <div className="max-w-md mx-auto bg-white shadow-md dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="text-2xl font-bold">Notifications</h4>
              <ul className="flex flex-col space-y-4 mt-4">
                <For each={resource().data.data.notifications}>
                  {(notif) => (
                    <li className="rounded-lg flex space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer px-2 py-2">
                      <div className="relative">
                        <UserAvatar
                          src={notif.fromUser.profileImage}
                          className="w-14 h-14 rounded-full flex-none"
                          alt={notif.fromUser.firstName}
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 grid place-items-center rounded-full bg-purple-500 text-white">
                          <FaSolidUsers />
                        </div>
                      </div>
                      <div className="flex flex-col items-start space-y-1">
                        <p>
                          <Link
                            href={`/${notif.fromUser.id}`}
                            className="hover:underline"
                          >
                            <span className="font-bold mr-1">
                              {notif.fromUser.firstName}
                            </span>
                          </Link>
                          <span>{notif.content}</span>
                        </p>

                        <span className="text-xs font-bold text-blue-500">
                          {getRelativeTime(notif.createdAt)}
                        </span>
                      </div>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </Show>
        </Match>
      </Switch>
    </div>
  );
}
