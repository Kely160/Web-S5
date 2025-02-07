<script setup>
defineProps({
  headers: {
    type: Array,
    default: () => ["Nom", "Symbole", "Prix Actuel", "Évolution (%)", "Action"],
  },
  rows: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="pt-5 mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card">
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th v-for="(header, index) in headers" :key="index"
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in rows" :key="index">
                    <!-- Nom -->
                    <td class="align-middle text-center">
                      <h6 class="mb-0 text-xs">{{ row.nom || 'Inconnu' }}</h6>
                    </td>

                    <!-- Symbole -->
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold">
                        {{ row.symbole || '-' }}
                      </span>
                    </td>

                    <!-- pourcentage -->
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold">
                        {{ row.pourcentage }}
                      </span>
                    </td>

                    <!-- Prix Actuel -->
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">
                        {{ row.prix_actuel || '0.00' }}
                      </span>
                    </td>


                    <td class="align-middle text-center">
                      <a :href="row.action?.route || '#'" class="btn btn-info btn-sm">
                        Évolution
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
