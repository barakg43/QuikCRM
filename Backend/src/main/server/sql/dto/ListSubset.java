package main.server.sql.dto;

import lombok.Data;

import java.util.List;

@Data
public class ListSubset<T> {
	private final List<T> listSubset;
	private final long totalAmountInDataBase;


	public ListSubset(List<T> subsetList, long totalAmountInDataBase) {
		this.listSubset = subsetList;
		this.totalAmountInDataBase = totalAmountInDataBase;
	}

}
