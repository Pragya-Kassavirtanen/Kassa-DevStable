import { watchGetInvoiceSaga, watchSaveAndSendInvoiceSaga, watchCopyInvoice, watchRemoveInvoiceSaga, watchSaveInvoiceDraft, watchEditInvoice, watchCancelEditInvoice, watchGetProfession } from './invoice.saga'
import { watchTaxSaga, watchGetTaxCardStartSaga, watchPostYelSaga, watchGetYelSaga } from './tax.saga'
import { watchCheckAuthInfoSaga } from './dashboard.saga'
import { watchLoadProfileSaga, watchUpdateProfileSaga, watchUpdatePasswordSaga } from './profile.saga'
import { watchNewCustomerSaga, watchGetCustomersSaga, watchGetCustomerByIdSaga, watchRemoveCustomerSaga, watchSaveCustomerSaga, watchCancelCustomerSaga, watchGetCustomerToAddInvoiceSaga } from './customer.saga'
import { watchSendRegisterInfoSaga } from './register.saga'
import { watchLoadRegisterReviewSaga } from './signup.saga'
import { watchSendContactInfoSaga } from './contact.saga'
import {
  watchAdminInvoiceSearchSaga,
  watchAdminInvoiceExpandSaga,
  watchAdminUsersSearchSaga,
  watchAdminChangeMenuSaga,
  watchAdminInvoiceUpdateSaga,
  watchAdminUserExpandSaga,
  watchAdminUserUpdateSaga
} from './admin.saga'
import { watchRehydrateSaga } from './rehydrate.saga'
import { watchGetNewSalarySaga, watchSelectRowSalarySaga, watchGetSalariesSaga, watchPostSalarySaga, watchGetSalaryByIdSaga, watchSaveSalarySlipSaga } from './salary.saga'
import { watchSaveExpenseSaga, watchSaveTravellingExpenseSaga, watchGetExpenseStartSaga, watchLoadAllowanceCostSaga, watchRemoveExpenseSaga, watchEditExpenseSaga, watchRemoveAllowanceSaga, watchEditAllowanceSaga, watchSaveAllowanceUpdateSaga,
  watchCancelAllowanceUpdateSaga,
  watchSaveExpenseUpdateSaga,
  watchCancelExpenseUpdateSaga } from './expense.saga'
import { watchLoginSaga } from './login.saga'

// Single entry point to start all sagas at once
export default function* rootSaga() {
  yield  [
    watchGetInvoiceSaga(),
    watchSaveAndSendInvoiceSaga(),
    watchTaxSaga(),
    watchCheckAuthInfoSaga(),
    watchLoadProfileSaga(),
    watchCopyInvoice(),
    watchRemoveInvoiceSaga(),
    watchEditInvoice(),
    watchCancelEditInvoice(),
    watchGetProfession(),
    
    watchNewCustomerSaga(),
    watchGetCustomersSaga(),
    watchGetCustomerByIdSaga(),
    watchRemoveCustomerSaga(),
    watchSaveCustomerSaga(),
    watchCancelCustomerSaga(),
    watchGetCustomerToAddInvoiceSaga(),

    watchSaveInvoiceDraft(),
    watchGetTaxCardStartSaga(),
    watchUpdateProfileSaga(),
    watchAdminInvoiceSearchSaga(),
    watchAdminInvoiceExpandSaga(),
    watchAdminUsersSearchSaga(),
    watchAdminChangeMenuSaga(),
    watchRehydrateSaga(),
    watchGetNewSalarySaga(),
    watchAdminInvoiceUpdateSaga(),
    watchAdminUserExpandSaga(),
    watchAdminUserUpdateSaga(),
    watchSaveExpenseSaga(),
    watchGetExpenseStartSaga(),
    watchPostYelSaga(),
    watchSaveTravellingExpenseSaga(),
    watchLoadAllowanceCostSaga(),
    watchGetYelSaga(),
    watchSelectRowSalarySaga(),
    watchGetSalariesSaga(),
    watchPostSalarySaga(),
    watchGetSalaryByIdSaga(),  
    watchSendRegisterInfoSaga(),
    watchLoginSaga(),
    watchRemoveExpenseSaga(),
    watchEditExpenseSaga(),
    watchRemoveAllowanceSaga(),
    watchEditAllowanceSaga(),
    watchSaveSalarySlipSaga(),
    watchSaveAllowanceUpdateSaga(),
    watchCancelAllowanceUpdateSaga(),
    watchSaveExpenseUpdateSaga(),
    watchCancelExpenseUpdateSaga(),
    watchUpdatePasswordSaga(),
    watchLoadRegisterReviewSaga(),
    watchSendContactInfoSaga()
  ]
}