package java.com.quik.backend;

import main.server.http.controlles.CustomerController;
import main.server.http.controlles.GlobalEndpointsController;
import main.server.http.controlles.reminders.ProductReminderController;
import main.server.http.controlles.reminders.ServiceRenewController;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class StartupTests {

	private GlobalEndpointsController globalEndpointsController;
	private ProductReminderController productReminderController;
	private CustomerController customerController;
	private ServiceRenewController serviceRenewController;

	@Test
	void globalContextLoad() {
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
