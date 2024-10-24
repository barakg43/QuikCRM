package java.com.quik.backend;

import main.server.http.controlles.CustomerController;
import main.server.http.controlles.GlobalEndpointsController;
import main.server.http.controlles.reminders.ProductReminderController;
import main.server.http.controlles.reminders.ServiceRenewController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class StartupTests {

	@Autowired
	private GlobalEndpointsController globalEndpointsController;

	@Autowired
	private ProductReminderController productReminderController;

	@Autowired
	private CustomerController customerController;

	@Autowired
	private ServiceRenewController serviceRenewController;

	@Test
	void globalContextLoad() throws Exception {
		assertThat(globalEndpointsController).isNotNull();
	}

	@Test
	void productReminderContextLoad() {
		assertThat(productReminderController).isNotNull();
	}

	@Test
	void customerContextLoad() {
		assertThat(customerController).isNotNull();
	}

	@Test
	void serviceContextLoad() {
		assertThat(serviceRenewController).isNotNull();
	}


}
