<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps({
  headers: {
    type: Array,
    default: () => ["Nom", "Solde", "Utilisateur", "Action"],
  },
  rows: {
    type: Array,
    default: () => [],
  },
});

const goToDetails = (detailRoute) => {
  if (detailRoute) {
    console.log(detailRoute);
    router.push(detailRoute);
  } else {
    console.log('Aucun détail disponible.');
  }
};
const goToSale = (detailRoute) => {
  if (detailRoute) {
    console.log(detailRoute);
    router.push(detailRoute);
  } else {
    console.log('Aucun détail disponible.');
  }
};
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
                    <!-- Nom du portefeuille -->
                    <td class="align-middle text-center">
                      <h6 class="mb-0 text-xs">{{ row.nom || 'Inconnu' }}</h6>
                    </td>

                    <!-- Solde -->
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold">
                        {{ row.solde || '0.00' }}
                      </span>
                    </td>

                    <!-- Crypto -->
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold">
                        {{ row.crypto || '0.00' }}
                      </span>
                    </td>

                    <!-- Actions -->
                    <td class="align-middle text-center">
                      <a @click.prevent="goToDetails(row.action?.detail)" class="btn btn-primary btn-sm mx-1">
                        Détails
                      </a>
                      <a @click.prevent="goToSale(row.action?.sale)" class="btn btn-warning btn-sm mx-1">
                        Achat/vente
                      </a>
                    </td>


                  </tr>
                  <tr v-if="rows.length === 0">
                    <td colspan="4" class="text-center text-xs text-secondary">
                      Aucun portefeuille disponible.
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
