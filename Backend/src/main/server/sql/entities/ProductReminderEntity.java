package main.server.sql.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Setter
@Getter
@Entity
@Table(name = "tbSystemsDetails")
public class ProductReminderEntity {
	@Id
	@Column(name = "SystemDetailID", nullable = false, precision = 18)
	private BigDecimal id;

	@Size(max = 50)
	@Nationalized
	@Column(name = "SystemDetailDescription", length = 50)
	private String systemDetailDescription;

	@Size(max = 50)
	@Nationalized
	@Column(name = "InternalIP", length = 50)
	private String internalIP;

	@Size(max = 50)
	@Nationalized
	@Column(name = "ExternalIP", length = 50)
	private String externalIP;

	@Size(max = 50)
	@Nationalized
	@Column(name = "UserName", length = 50)
	private String userName;

	@Size(max = 50)
	@Nationalized
	@Column(name = "Password", length = 50)
	private String password;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CustomerID", referencedColumnName = "customerID", insertable = false, updatable = false)
	private CustomerEntity customer;

	@Column(name = "ValidityTill")
	private Timestamp validityTill;

}