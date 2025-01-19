<template>
  <div class="mt-5">
    <p class="font-bold">Restaurent List</p>

    <div
      class="mt-5 overflow-x-auto rounded-md border bg-background scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b text-left text-xs">
            <th class="p-4 font-medium uppercase text-muted-foreground">Name</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Branch name</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Address</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Active</th>
            <th class="p-4 font-medium uppercase text-muted-foreground"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 6" class="border-b text-left text-sm last:border-b-0 hover:bg-muted">
            <td class="p-4">restaurent 001</td>
            <td class="p-4">Gulshan branch 001</td>
            <td class="p-4">Gulshan 1 circle</td>
            <td class="p-4">True</td>
            <td class="p-4">
              <div class="flex items-center gap-3">
                <button>
                  <Icon name="heroicons:eye" class="h-4 w-4 text-muted-foreground" />
                </button>
                <button>
                  <Icon name="heroicons:pencil-square" class="h-4 w-4 text-muted-foreground" />
                </button>
                <button>
                  <Icon name="heroicons:trash" class="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
