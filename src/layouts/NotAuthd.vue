<template>
  <div class="relative lg:grid grid-cols-2 w-screen h-screen">
    <section class="relative h-full w-full lg:w-auto bg-[#F1F7FA]">
      <img src="" class="absolute left-1/2 top-1/2 !hidden lg:!block lg:w-[450px] -translate-x-1/2 -translate-y-1/2" />
    </section>
    <main
      class="absolute lg:static top-1/2 left-1/2 flex justify-center items-center w-[90%] lg:w-auto h-auto lg:bg-[#F9F9F9] -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0"
    >
      <router-view />
    </main>
  </div>
</template>
