import React, { useState } from 'react';

import Trigger from './Trigger';
import NotificationMenu from './NotificationMenu';

// To be removed
import { notificationItems } from './backend/mock-data';

export default function Notifications() {
  const [isOpened, setOpen] = useState(false);
  const [triggerEl, setTrigger] = useState(null);

  function openMenu(e) {
    setTrigger(e.currentTarget);
    setOpen(true);
  }

  return (
    <>
      <Trigger
        onTrigger={openMenu}
        invisibleBadge={!notificationItems.length}
        menuOpened={isOpened}
      />
      <NotificationMenu
        triggerEl={triggerEl}
        isOpened={isOpened}
        onClose={() => setOpen(false)}
        notificationItems={notificationItems}
      />
    </>
  );
}
