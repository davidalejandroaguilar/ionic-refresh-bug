# Description

This repository illustrates a bug in:

- @ionic/react 8.4.1
- swiper 11.2.0
- iOS 18.1.1

We have a basic sample code rendering a collection of places with the following data:

- Title
- Description
- Photos

It uses Swiper to display a swipeable gallery on a media card. It only uses Ionic components to create the card.

It also uses 2 basic segments and a toolbar.

The problem is that for some reason, if the card gets a bit too tall, refreshing the view on iOS causes the view to refresh at the slighest scroll up or down uncontrollably, and when you manage to refresh the view, the view flashes in a jarring manner.

It can be reproduced on the following commits:

1. 664270b - Non working code with Swiper

Here, the image has a 4/4 aspect ratio set with an image of size 600x400. The card gets a big too big and causes the behavior described above.

https://github.com/user-attachments/assets/422bba19-55a0-4769-a44b-a87f35185ec4

2. 0366fce - "Working" code with Swiper and smaller image dimensions

Here, the image has a 16/9 aspect ratio set with an image of size 600x400. The card gets a bit smaller and the uncontrollable refresh at the slighest scroll up or down is fixed, but you still get view flashes in a jarring manner when refreshing.

https://github.com/user-attachments/assets/cce327d7-36c8-418f-a446-b5aad39b3b09

3. 16df9a4 - Working code without Swiper

Here, the image has a 4/4 aspect ratio set with an image of size 600x400. The card gets a big too big, but since Swiper is removed, the behavior described above does not happen anymore.

https://github.com/user-attachments/assets/ef743ab8-7c1a-4dc0-9475-449303ca704c

4. 8317cab - Non working code without segments

Here, the image has a 4/4 aspect ratio set with an image of size 600x400. The card gets a big too big, and even now with the segments removed, the behavior described above happens.

https://github.com/user-attachments/assets/9c57599c-e7c1-4396-8366-2bcaad2ef41d
